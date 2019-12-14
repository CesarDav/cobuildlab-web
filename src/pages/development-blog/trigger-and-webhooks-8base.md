---
title: Trigger and Webhooks Whit 8base
date: 2019-26-16T01:00:00+00:00
tags:
template: development-post
---

Continuing with the [app](connect-to-8base-and-make-a-query.md) in previous articles we are going to perform custom functions on the 8base server

## Custom Functions

They are functions that run on the 8base server, they are useful to expand the functionalities of your 8base server.

## 8base has 4 types of custom functions

**Resolvers:** For extending your GraphQL API
**Webhooks:** For RESTful endpoints (GET, POST, DELETE, etc...)
**Triggers:** For functions requiring event-based execution
**Tasks:** For invocable and scheduled (cron) functions

In this tutorial we will do 2 custom functions, trigger and webhooks

## Triggers

Trigger functions are functions that are executed when an event occurs,it can be before or after that event. To create the function you have to exist a project 8base, let's create the project with the following command.

    8base init . --functions=trigger:mytrigger --syntax:'js'

```javascript
module.exports = async (event, ctx) => {
  console.log('EVENT', event)
  console.log('CTX ', ctx)
  const {
    data: { email },
  } = event

  if (!email) {
    throw new Error('Email does not exist!')
  }

  return {
    data: { ...data },
  }
}
```

data is the object that is stored in the database

## Webhooks

A webhook allows you to call Custom Functions as regular RESTful endpoints. They can be very useful if you integrate with a 3rd party service that posts data back to your app using a specified URL.

    8base generate webhook testwebhook -s='js'

```javascript
/**
 * Import any dependencies. All deployed functions can utilize any dependency
 * that was declared in the projects package.json file.
 */
import gql from 'graphql-tag';

/**
 * Custom modules can get imported (and shared between functions)
 * by importing/requiring them using relative paths.
 */
import { sendMail, GMAIL_USER } from './mailer';

/**
 * Inside the webhook, API calls can be executed against your
 * workspace and 3rd party API's.
 */
const INVOICE_MUTATION = gql`
  mutation Invoice($id: ID!, $state: STRING!) {
    invoiceUpdate(data: {
        id: $id
        state: $state
    }) {
      id
      state
      customer {
          name
          email
      }
    }
  }
`;

/**
 * Webhook response objects require a statusCode attribute to be specified.
 * A response body can get specified as a stringified JSON object and any
 * custom headers set.
 */
const responseBuilder = (code=200, message=undefined, headers={}) => ({
  body: JSON.stringify({ message }),
  statusCode: code,
  headers
})

/**
 * The webhook function's handler can be synchronous or asynchronous and
 * is always passed the event, and context (ctx) arguments.
 */
module.exports = async (event, ctx) => {
  let response

  try {
    /**
     * Access posted data on the event object:
     * {
     *   "invoiceId": <invoiceID>,
     *   "chargeType": <chargeType>
     * }
     */
    response = await ctx.api.gqlRequest(INVOICE_MUTATION, {
        id: event.data.invoiceId
        state: event.data.chargeType
    })
  /* Handle errors for failed GraphQL mutation */
  } catch (e) {
    return responseBuilder(422, "Failed to update invoice")
  }

  try {
      /**
     * If the update was successful, send an email to the
     * app user notifying them.
     */
    const { invoiceUpdatenv: { customer } } = response

    /* Add email event to logs */
    console.log(`Sending email to ${customer.email}...`)

    /* Send email using imported module */
    await sendMail({
      from: GMAIL_USER,
      to: customer.email,
      subject: 'An update about your invoice',
      html: `
          Hi ${customer.name},
          You're invoice was just marked ${invoiceUpdate.state}
          Thanks!
      `
    })

  /* Handle error for failed email */
  } catch (e) {
    return responseBuilder(400, 'Failed to notify user')
  }

  /* Return final success response */
  return responseBuilder(200, 'Success')
};
```

## Install nodemailer and create a file

    npm i nodemailer

```javascript
const nodemailer = require('nodemailer')

const GMAIL_USER = '8base.app.example@gmail.com'
const GMAIL_PASSWORD = 'oBiiQicRJmUDMXY>VdtW^6M'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
})

const sendMail = async mailOptions =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })

module.exports = {
  sendMail,
  GMAIL_USER,
}
```

## Deploy

          npm install
          8base deploy

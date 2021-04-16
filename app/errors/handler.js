'use strict'

import { ErrorHandler as Handler } from '@supercharge/core'

export class ErrorHandler extends Handler {
  /**
   * Register the error handling callbacks. For example, to report error
   * upstream to an error tracking service, like Sentry or Bugsnag.
   */
  register () {
    // this.reportable(async error => {
    //   await this.sendToIssueTracker(error)
    // })
  }
}

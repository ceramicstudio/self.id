import * as CoreAPIs from '@self.id/core'
import * as FrameworkAPIs from '@self.id/framework'
import * as WebAPIs from '@self.id/web'
import React from 'react'

export default {
  React,
  ...React,
  ...CoreAPIs,
  ...FrameworkAPIs,
  ...WebAPIs,
}

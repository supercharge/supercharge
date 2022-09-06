'use strict'

import { ViewServiceProvider } from '@supercharge/view'
import { ViteServiceProvider } from '@supercharge/vite'
import { ServiceProviderCtor } from '@supercharge/contracts'
import { HashingServiceProvider } from '@supercharge/hashing'
import { SessionServiceProvider } from '@supercharge/session'
import { EncryptionServiceProvider } from '@supercharge/encryption'
import { AppServiceProvider } from '../app/providers/app-service-provider'
import { RouteServiceProvider } from '../app/providers/route-service-provider'

export const providers: ServiceProviderCtor[] = [
  /**
   * All listed providers will be registered and booted while starting your
   * application. You may add your own providers to this list registering
   * custom functionality to your application. In alphabetical sorting.
   */
  AppServiceProvider,
  EncryptionServiceProvider,
  HashingServiceProvider,
  RouteServiceProvider,
  SessionServiceProvider,
  ViewServiceProvider,
  ViteServiceProvider
]

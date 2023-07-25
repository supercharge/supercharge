'use strict'

import { ViewConfig } from '@supercharge/contracts'
import { App, Env } from '@supercharge/facades'

const viewConfig: ViewConfig = {
  /**
   * --------------------------------------------------------------------------
   * Default View Driver
   * --------------------------------------------------------------------------
   *
   * This setting defines the view driver used by Supercharge to render views.
   * This driver-based approach allows you to select the template rendering
   * engine that suites your needs. Find all supported view drivers below.
   *
   * Supported drivers: "handlebars"
   *
   */
  driver: Env.get('VIEW_DRIVER', 'handlebars'),

  /**
   * --------------------------------------------------------------------------
   * Handlebars Settings
   * --------------------------------------------------------------------------
   */
  handlebars: {
    /**
     * --------------------------------------------------------------------------
     * Path to View Files
     * --------------------------------------------------------------------------
     *
     * This setting defines the path to your view files. Supercharge projects
     * usually keep their views inside the `resources/views` directory. You
     * may change this path if you’re customizing the directory structure.
     *
     */
    views: App.resourcePath('views'),

    /**
     * --------------------------------------------------------------------------
     * Path to Partial View Files
     * --------------------------------------------------------------------------
     *
     * This setting defines the path to your partial view files.
     *
     */
    partials: App.resourcePath('views/partials'),

    /**
     * --------------------------------------------------------------------------
     * Path to View Helper Files
     * --------------------------------------------------------------------------
     *
     * This setting defines the path to your view helper files.
     *
     */
    helpers: App.resourcePath('views/helpers'),

    /**
     * --------------------------------------------------------------------------
     * Path to View Layout Files
     * --------------------------------------------------------------------------
     *
     * This setting defines the path to your layout files.
     *
     */
    layouts: App.resourcePath('views'),

    /**
     * --------------------------------------------------------------------------
     * Default View Layout
     * --------------------------------------------------------------------------
     *
     * This setting defines the name of your default layout. Supercharge always
     * uses the default layout when rendering a view, for example using the
     * `response.view()` method.
     *
     */
    defaultLayout: App.resourcePath('views/layouts/app.hbs')
  },
}

export default viewConfig

import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { MyApp } from './app';
import {TRANSLATE_PROVIDERS, TranslateService,TranslateStaticLoader,TranslateLoader} from "ng2-translate/ng2-translate";

bootstrap(MyApp, [
  HTTP_PROVIDERS,
  TRANSLATE_PROVIDERS
]);
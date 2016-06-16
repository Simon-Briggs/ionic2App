import { bootstrap } from '@angular/platform/browser';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { MyApp } from './app';
import {TRANSLATE_PROVIDERS, TranslateService,TranslateStaticLoader,TranslateLoader} from "ng2-translate/ng2-translate";

bootstrap(MyApp, [
  HTTP_PROVIDERS,
  TRANSLATE_PROVIDERS
]);
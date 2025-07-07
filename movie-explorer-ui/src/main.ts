import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig
//   {
//   providers: [
//     provideAnimations(),
//     importProvidersFrom(NgbModule),
//   ],
// }
).catch(err => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),
//     importProvidersFrom(HttpClientModule, NgbModule),
//   ]
// }).catch(err => console.error(err));

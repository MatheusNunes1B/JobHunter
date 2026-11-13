import type { CapacitorConfig } from '@capacitor/cli';
import '@capacitor/splash-screen';
const config: CapacitorConfig = {
  appId: 'com.jobhunter.app', appName: 'JobHunter', webDir: 'dist',
  plugins: { SplashScreen: {
    launchShowDuration: 1200, launchAutoHide: true, backgroundColor: '#2563EB',
    androidSplashResourceName: 'splash', androidScaleType: 'CENTER_INSIDE', showSpinner: false,
  } },
};
export default config;
# MMS-Photo-Gallery

## Getting started:

1.  make sure you have the latest version of expo installed globally:

        yarn global add expo-cli

2.  clone the repo locally: 

        git@github.com:fhulufheloPolymorph/MMS-Photo-Gallery.git

3.  install the dependencies:

        cd MMS-Photo-Gallery
        yarn

4.  run the web client, to check if everything works:

        yarn web

    or

        expo start

## Testing

To run unit tests locally, using _Jest_:
yarn test

## Deployment

The standalone app binaries can then be downloaded from Expo and uploaded to Google Play and the App Store manually.

Once a user install the app, they should automatically receive **Over-The-Air (OTA) updates**, with each new Expo build. Note that the Expo _release channel_ of the binary that was initially uploaded to the store will be the one that users receive updates from.

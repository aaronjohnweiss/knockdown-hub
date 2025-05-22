# Know Your Percents
Dataset, site and companion app for Super Smash Brothers Melee Knockdown percentages.

## Getting Started

### Site
* `cd ./site`
* `yarn install`
* `yarn start`

### App
* `cd ./app`
* `yarn install`
* `yarn start`
* Optional - turn on / modify mock data in `useNewGame.jsx` and `usePlayerPercents.jsx` hooks. 

#### To Do
* Introduce proper mock locations.

### Data
* `cd ./data`
* Use global python console to execute scripts, or create your own and reference the `cc` and `kd` directories.
* Provide `DRIVER_PATH` in .env if executing `ikneedata-scraper.py`

#### To Do
* Introduce requirements.txt
* Include manual override section in parser logic for hitbox adjustments

## Licenses

* This project is licensed under the Mozilla Public License 2.0.
See the LICENSE file for details.
* License information for third-party components can be found in the licenses/ folder.
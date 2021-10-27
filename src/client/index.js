import { getDataFromServer } from './js/getDataFromServer';
import { postDataToServer } from './js/postDataToServer';
import { app } from './js/app';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/main.scss';
import './styles/footer.scss';
import './styles/responsive.scss';

app();

export { app, postDataToServer, getDataFromServer };

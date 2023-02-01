import axios from "axios";
import { environment } from "../../../config/environment/index.js";

const { DRIVENT_DOMAIN } = environment;

axios.defaults.baseURL = DRIVENT_DOMAIN;

export { axios as server };

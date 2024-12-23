import Admin from "./Admin.mjs";
import { loadHeaderFooter, showCartItemCount} from "./utils.mjs";

const admin = new Admin();
admin.init();

loadHeaderFooter(showCartItemCount);

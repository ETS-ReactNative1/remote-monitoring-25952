import _dashboard from './dashboard.styles';
import _login from './login.styles';
import _common from './common.styles'; 

const styles = {..._common,..._dashboard, ..._login};
export {styles};
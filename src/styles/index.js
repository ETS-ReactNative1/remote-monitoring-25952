import _dashboard from './dashboard.styles';
import _login from './login.styles';
import _common from './common.styles'; 
import _plan from './plan.styles'; 

const styles = {..._common,..._plan,..._dashboard, ..._login};
export {styles};
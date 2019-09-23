import Dialogue from './src/main';

Dialogue.install = Vue => {
    Vue.component(Dialogue.name, Dialogue);
};

export default Dialogue;
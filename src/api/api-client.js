import superagentUse from 'superagent-use';

const agent = superagentUse(require('superagent'));

agent.use();

export default agent;

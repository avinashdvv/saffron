import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';
import FactoryFragment from 'common/fragments/factory';
import { APP_NS, MAIN_COMPONENT_NS } from 'common/fragments/queries';
import { INITIALIZE } from 'common/messages';
import { CallbackDispatcher, TypeDispatcher } from 'common/dispatchers';

export default FactoryFragment.create({
  namespace: APP_NS,
  factory: {
    create: create
  }
});

function create(app) {
  
  var { dispatcher, fragments } = app;
  
  dispatcher.push(
    TypeDispatcher.create(INITIALIZE, CallbackDispatcher.create(initialize))
  );
  
  // after initialization, start rendering
  function initialize() {
    render(); 
    dispatcher.push(CallbackDispatcher.create(throttle(render, 100)));
  }
  
  // called whenever a new notification is dispatched
  function render() {
    ReactDOM.render(
      fragments.searchOne(MAIN_COMPONENT_NS).create({
        dispatcher : dispatcher,
        fragments  : fragments
      }),
      app.element
    );
  }
}

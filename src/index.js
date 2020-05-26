/**
 * 同步加载
 */
import _ from 'lodash'
let element = document.createElement('div');
element.innerHTML = _.join(['Jianghuchuan', '277'], '-');

/**
 * 异步加载
 * @returns {Promise<*>}
 */
// function getComponent() {
//   return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _}) => {
//     let element = document.createElement('div');
//     element.innerHTML = _.join(['Jianghuchuan', '277'], '-');
//     return element
//   })
// }

getComponent().then(element => {
  document.body.appendChild(element)
});

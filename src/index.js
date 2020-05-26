/**
 * 同步加载
 */
// import _ from 'lodash'
// console.log(_.join(['a','d','c'], '***'));
// // 此处省略10万行业务逻辑,业务代码大小假设为1mb
// console.log(_.join(['a','b','c'], '***'));

/**
 * 异步加载
 * @returns {Promise<*>}
 */
function getComponent() {
  return import('lodash').then(({default: _}) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Jianghuchuan', '277'], '-');
    return element
  })
}

getComponent().then(element => {
  document.body.appendChild(element)
});

const {override, fixBabelImports, addLessLoader, addWebpackPlugin} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const customizer = () => config => {
  /* do whatever you need to do */
  return config
}

module.exports = override(
  customizer({
      global: false,
      Buffer: false,
      BigInt: false,
    }
  ),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
      javascriptEnabled: true,
      modifyVars: {
        // '@primary-color': '#1DA57A',
        // '@link-color': '#1890ff', // link color
        // '@success-color': '#52c41a', // success state color
        // '@warning-color': '#faad14', // warning state color
        // '@error-color': '#f5222d', // error state color
        // '@font-size-base': '14px', // major text font size
        // '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
        // '@text-color': 'rgba(0, 0, 0, 0.65)', // major text color
        // '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
        // '@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
        // '@border-radius-base': '4px', // major border radius
        // '@border-color-base': '#d9d9d9', // major border color
        // '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // major shadow for layers
      },
    },
  }),
);

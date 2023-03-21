/**
 * ## 補足：なぜtsではなくjsにしているか
 *
 * formkit.config.tsでDefaultConfigOptions型のconfig
 * として定義することも可能。しかし下記の難点があり、あえてjsにしている。
 *
 * ts時の難点：
 * VSCode上で.nuxt/components.d.tsのグローバルコンポーネントが辿れなくなる。
 * 結果、componentsディレクトリに定義したカスタムコンポーネントを使用する際の
 * コード補完やコードジャンプが効かなくなる。
 *
 */
export default {
  config: {
    rootClasses (sectionKey, node) {
      const type = node.props.type;
      const classConfig = {
        outer: 'mb-5',
        legend: 'block mb-1 font-bold',
        label () {
          if (type === 'text' || type === 'select' || type === 'tel') {
            return 'block mb-1 font-bold';
          }
          if (type === 'textarea') {
            return 'block mb-1 font-bold';
          }
          if (type === 'radio' || type === 'checkbox') {
            return 'text-sm text-gray-600 mt-0.5';
          }
        },
        options () {
          if (type === 'radio' || type === 'checkbox') {
            return 'flex flex-col flex-grow mt-2';
          }
        },
        input () {
          if (type === 'text' || type === 'select' || type === 'tel') {
            return 'w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline';
          }
          if (type === 'textarea') {
            return 'w-full px-3 mb-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:shadow-outline';
          }
          if (type === 'radio' || type === 'checkbox') {
            return 'mr-2';
          }
        },
        wrapper () {
          if (type === 'radio' || type === 'checkbox') {
            return 'flex flex-row flex-grow';
          }
        },
        message: 'text-red-500 text-xs',
        help: 'text-xs text-gray-500',
      };

      const createClassObject = (classesArray) => {
        if (!classesArray) { return ''; }
        const classList = classesArray.split(' ').reduce((acc, className) => {
          acc[className] = true;
          return acc;
        }, {});

        return classList;
      };

      const target = classConfig[sectionKey];
      if (typeof target === 'string') {
        return createClassObject(target);
      } else if (typeof target === 'function') {
        return createClassObject(classConfig[sectionKey]());
      }
    },
  },
};

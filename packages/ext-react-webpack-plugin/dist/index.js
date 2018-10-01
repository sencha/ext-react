'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require('@babel/polyfill');

class ExtWebpackPlugin {
  constructor(options) {
    this.plugin = require(`./pluginUtil`)._constructor(options);
  }

  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.thisCompilation.tap(`ext-this-compilation`, compilation => {
        if (this.plugin.vars.pluginErrors.length > 0) {
          compilation.errors.push(new Error(this.plugin.vars.pluginErrors.join("")));
        }
      });

      if (this.plugin.vars.pluginErrors.length > 0) {
        return;
      }

      if (this.plugin.vars.framework == 'extjs') {
        compiler.hooks.afterCompile.tap('ext-after-compile', compilation => {
          require(`./extjsUtil`)._afterCompile(compilation, this.plugin.vars, this.plugin.options);
        });
      } else {
        compiler.hooks.compilation.tap(`ext-compilation`, compilation => {
          require(`./pluginUtil`)._compilation(compiler, compilation, this.plugin.vars, this.plugin.options);
        });
      }

      compiler.hooks.emit.tapAsync(`ext-emit`, (compilation, callback) => {
        require(`./pluginUtil`).emit(compiler, compilation, this.plugin.vars, this.plugin.options, callback);
      }); //if (this.plugin.options.emit == true) {
      //  compiler.hooks.emit.tapAsync(`ext-emit`, (compilation, callback) => {
      //    require(`./pluginUtil`).emit2(compiler, compilation, this.plugin.vars, this.plugin.options, callback)
      //  })
      // }
      // else {
      //   require('./pluginUtil').log(`${this.plugin.vars.app}Emit not run`)
      // }

      compiler.hooks.done.tap(`ext-done`, () => {
        require('./pluginUtil').log(this.plugin.vars.app + `Completed ext-webpack-plugin processing`);
      });
    } else {
      console.log('not webpack 4');
    }
  }

}

exports.default = ExtWebpackPlugin;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRXh0V2VicGFja1BsdWdpbiIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsInBsdWdpbiIsIl9jb25zdHJ1Y3RvciIsImFwcGx5IiwiY29tcGlsZXIiLCJob29rcyIsInRoaXNDb21waWxhdGlvbiIsInRhcCIsImNvbXBpbGF0aW9uIiwidmFycyIsInBsdWdpbkVycm9ycyIsImxlbmd0aCIsImVycm9ycyIsInB1c2giLCJFcnJvciIsImpvaW4iLCJmcmFtZXdvcmsiLCJhZnRlckNvbXBpbGUiLCJfYWZ0ZXJDb21waWxlIiwiX2NvbXBpbGF0aW9uIiwiZW1pdCIsInRhcEFzeW5jIiwiY2FsbGJhY2siLCJkb25lIiwibG9nIiwiYXBwIiwiY29uc29sZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFDQUEsT0FBTyxDQUFDLGlCQUFELENBQVA7O0FBRWUsTUFBTUMsZ0JBQU4sQ0FBdUI7QUFDcENDLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO0FBQ25CLFNBQUtDLE1BQUwsR0FBY0osT0FBTyxDQUFFLGNBQUYsQ0FBUCxDQUF3QkssWUFBeEIsQ0FBcUNGLE9BQXJDLENBQWQ7QUFDRDs7QUFDREcsRUFBQUEsS0FBSyxDQUFDQyxRQUFELEVBQVc7QUFDZCxRQUFJQSxRQUFRLENBQUNDLEtBQWIsRUFBb0I7QUFFbEJELE1BQUFBLFFBQVEsQ0FBQ0MsS0FBVCxDQUFlQyxlQUFmLENBQStCQyxHQUEvQixDQUFvQyxzQkFBcEMsRUFBNERDLFdBQUQsSUFBaUI7QUFDMUUsWUFBSSxLQUFLUCxNQUFMLENBQVlRLElBQVosQ0FBaUJDLFlBQWpCLENBQThCQyxNQUE5QixHQUF1QyxDQUEzQyxFQUE4QztBQUM1Q0gsVUFBQUEsV0FBVyxDQUFDSSxNQUFaLENBQW1CQyxJQUFuQixDQUF5QixJQUFJQyxLQUFKLENBQVUsS0FBS2IsTUFBTCxDQUFZUSxJQUFaLENBQWlCQyxZQUFqQixDQUE4QkssSUFBOUIsQ0FBbUMsRUFBbkMsQ0FBVixDQUF6QjtBQUNEO0FBQ0YsT0FKRDs7QUFNQSxVQUFJLEtBQUtkLE1BQUwsQ0FBWVEsSUFBWixDQUFpQkMsWUFBakIsQ0FBOEJDLE1BQTlCLEdBQXVDLENBQTNDLEVBQThDO0FBQzVDO0FBQ0Q7O0FBRUQsVUFBSyxLQUFLVixNQUFMLENBQVlRLElBQVosQ0FBaUJPLFNBQWpCLElBQThCLE9BQW5DLEVBQTRDO0FBQzFDWixRQUFBQSxRQUFRLENBQUNDLEtBQVQsQ0FBZVksWUFBZixDQUE0QlYsR0FBNUIsQ0FBZ0MsbUJBQWhDLEVBQXNEQyxXQUFELElBQWlCO0FBQ3BFWCxVQUFBQSxPQUFPLENBQUUsYUFBRixDQUFQLENBQXVCcUIsYUFBdkIsQ0FBcUNWLFdBQXJDLEVBQWtELEtBQUtQLE1BQUwsQ0FBWVEsSUFBOUQsRUFBb0UsS0FBS1IsTUFBTCxDQUFZRCxPQUFoRjtBQUNELFNBRkQ7QUFHRCxPQUpELE1BS0s7QUFDSEksUUFBQUEsUUFBUSxDQUFDQyxLQUFULENBQWVHLFdBQWYsQ0FBMkJELEdBQTNCLENBQWdDLGlCQUFoQyxFQUFtREMsV0FBRCxJQUFpQjtBQUNqRVgsVUFBQUEsT0FBTyxDQUFFLGNBQUYsQ0FBUCxDQUF3QnNCLFlBQXhCLENBQXFDZixRQUFyQyxFQUErQ0ksV0FBL0MsRUFBNEQsS0FBS1AsTUFBTCxDQUFZUSxJQUF4RSxFQUE4RSxLQUFLUixNQUFMLENBQVlELE9BQTFGO0FBQ0QsU0FGRDtBQUdEOztBQUVESSxNQUFBQSxRQUFRLENBQUNDLEtBQVQsQ0FBZWUsSUFBZixDQUFvQkMsUUFBcEIsQ0FBOEIsVUFBOUIsRUFBeUMsQ0FBQ2IsV0FBRCxFQUFjYyxRQUFkLEtBQTJCO0FBQ2xFekIsUUFBQUEsT0FBTyxDQUFFLGNBQUYsQ0FBUCxDQUF3QnVCLElBQXhCLENBQTZCaEIsUUFBN0IsRUFBdUNJLFdBQXZDLEVBQW9ELEtBQUtQLE1BQUwsQ0FBWVEsSUFBaEUsRUFBc0UsS0FBS1IsTUFBTCxDQUFZRCxPQUFsRixFQUEyRnNCLFFBQTNGO0FBQ0QsT0FGRCxFQXZCa0IsQ0EyQmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFsQixNQUFBQSxRQUFRLENBQUNDLEtBQVQsQ0FBZWtCLElBQWYsQ0FBb0JoQixHQUFwQixDQUF5QixVQUF6QixFQUFvQyxNQUFNO0FBQ3hDVixRQUFBQSxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCMkIsR0FBeEIsQ0FBNEIsS0FBS3ZCLE1BQUwsQ0FBWVEsSUFBWixDQUFpQmdCLEdBQWpCLEdBQXdCLHlDQUFwRDtBQUNELE9BRkQ7QUFJRCxLQXhDRCxNQXlDSztBQUFDQyxNQUFBQSxPQUFPLENBQUNGLEdBQVIsQ0FBWSxlQUFaO0FBQTZCO0FBQ3BDOztBQS9DbUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbnJlcXVpcmUoJ0BiYWJlbC9wb2x5ZmlsbCcpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dFdlYnBhY2tQbHVnaW4ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5wbHVnaW4gPSByZXF1aXJlKGAuL3BsdWdpblV0aWxgKS5fY29uc3RydWN0b3Iob3B0aW9ucylcbiAgfVxuICBhcHBseShjb21waWxlcikge1xuICAgIGlmIChjb21waWxlci5ob29rcykge1xuXG4gICAgICBjb21waWxlci5ob29rcy50aGlzQ29tcGlsYXRpb24udGFwKGBleHQtdGhpcy1jb21waWxhdGlvbmAsIChjb21waWxhdGlvbikgPT4ge1xuICAgICAgICBpZiAodGhpcy5wbHVnaW4udmFycy5wbHVnaW5FcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbXBpbGF0aW9uLmVycm9ycy5wdXNoKCBuZXcgRXJyb3IodGhpcy5wbHVnaW4udmFycy5wbHVnaW5FcnJvcnMuam9pbihcIlwiKSkgKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAodGhpcy5wbHVnaW4udmFycy5wbHVnaW5FcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCB0aGlzLnBsdWdpbi52YXJzLmZyYW1ld29yayA9PSAnZXh0anMnKSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmFmdGVyQ29tcGlsZS50YXAoJ2V4dC1hZnRlci1jb21waWxlJywgKGNvbXBpbGF0aW9uKSA9PiB7XG4gICAgICAgICAgcmVxdWlyZShgLi9leHRqc1V0aWxgKS5fYWZ0ZXJDb21waWxlKGNvbXBpbGF0aW9uLCB0aGlzLnBsdWdpbi52YXJzLCB0aGlzLnBsdWdpbi5vcHRpb25zKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbXBpbGVyLmhvb2tzLmNvbXBpbGF0aW9uLnRhcChgZXh0LWNvbXBpbGF0aW9uYCwgKGNvbXBpbGF0aW9uKSA9PiB7XG4gICAgICAgICAgcmVxdWlyZShgLi9wbHVnaW5VdGlsYCkuX2NvbXBpbGF0aW9uKGNvbXBpbGVyLCBjb21waWxhdGlvbiwgdGhpcy5wbHVnaW4udmFycywgdGhpcy5wbHVnaW4ub3B0aW9ucylcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgY29tcGlsZXIuaG9va3MuZW1pdC50YXBBc3luYyhgZXh0LWVtaXRgLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHJlcXVpcmUoYC4vcGx1Z2luVXRpbGApLmVtaXQoY29tcGlsZXIsIGNvbXBpbGF0aW9uLCB0aGlzLnBsdWdpbi52YXJzLCB0aGlzLnBsdWdpbi5vcHRpb25zLCBjYWxsYmFjaylcbiAgICAgIH0pXG5cbiAgICAgIC8vaWYgKHRoaXMucGx1Z2luLm9wdGlvbnMuZW1pdCA9PSB0cnVlKSB7XG4gICAgICAvLyAgY29tcGlsZXIuaG9va3MuZW1pdC50YXBBc3luYyhgZXh0LWVtaXRgLCAoY29tcGlsYXRpb24sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAvLyAgICByZXF1aXJlKGAuL3BsdWdpblV0aWxgKS5lbWl0Mihjb21waWxlciwgY29tcGlsYXRpb24sIHRoaXMucGx1Z2luLnZhcnMsIHRoaXMucGx1Z2luLm9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgLy8gIH0pXG4gICAgICAvLyB9XG4gICAgICAvLyBlbHNlIHtcbiAgICAgIC8vICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nKGAke3RoaXMucGx1Z2luLnZhcnMuYXBwfUVtaXQgbm90IHJ1bmApXG4gICAgICAvLyB9XG5cbiAgICAgIGNvbXBpbGVyLmhvb2tzLmRvbmUudGFwKGBleHQtZG9uZWAsICgpID0+IHtcbiAgICAgICAgcmVxdWlyZSgnLi9wbHVnaW5VdGlsJykubG9nKHRoaXMucGx1Z2luLnZhcnMuYXBwICsgYENvbXBsZXRlZCBleHQtd2VicGFjay1wbHVnaW4gcHJvY2Vzc2luZ2ApXG4gICAgICB9KVxuXG4gICAgfVxuICAgIGVsc2Uge2NvbnNvbGUubG9nKCdub3Qgd2VicGFjayA0Jyl9XG4gIH1cbn1cbiJdfQ==
const gulp = require("gulp");
const apidoc = require("gulp-apidoc");

gulp.task("apidoc", done => {
  apidoc(
    {
      src: "./src/routes",
      dest: "./src/docs"
    },
    done
  );
});

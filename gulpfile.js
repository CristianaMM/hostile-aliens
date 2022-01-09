const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");

gulp.task("sass", function () {
  return gulp
    .src("./styles/styles.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename("styles.css"))
    .pipe(gulp.dest("./styles/"));
});

gulp.task("default", function () {
  gulp.watch("./styles/**/*.scss", gulp.series("sass"));
});

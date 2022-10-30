"use strict";

/* This is importing the required modules. */
const { src, dest, series } = require("gulp");
const htmlMinifier = require("gulp-htmlmin");

const size = require("gulp-size");

/**********************
 #Compiler for Development
***********************/

/**
 * It compiles HTML files.
 * @returns The htmlCompiler function is being returned.
 */
function htmlCompilerDevelopment() {
  return src("src/**/*.html")
    .pipe(size({ title: "HTML", showFiles: true, pretty: true }))
    .pipe(dest("public"));
}
exports.htmlDevelopment = htmlCompilerDevelopment;

/**********************
 #Compiler for Deployment
***********************/
/**
 * Take all the HTML files in the src folder, minify them, and put them in the public folder.
 * @returns The htmlCompileDeployment function is returning the src function.
 */
function htmlCompileDeployment() {
  return src("src/**/*.html")
    .pipe(
      htmlMinifier({
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      })
    )
    .pipe(dest("public"));
}

function xmlCompileDeployment() {
  return src("src/**/*.xml").pipe(dest("public"));
}
function txtCompileDeployment() {
  return src("src/**/*.txt").pipe(dest("public"));
}

exports.htmlDeployment = series(
  htmlCompileDeployment,
  xmlCompileDeployment,
  txtCompileDeployment
);

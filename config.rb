require 'sass-css-importer'

css_dir = "dist/styles"
sass_dir = "src/styles"

add_import_path Sass::CssImporter::Importer.new("./")

# compost-jekyll-theme

Jekyll port for [COMPOST Magazine Issue 02](https://two.compost.digital/)

## Installation

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "compost-jekyll-theme"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: compost-jekyll-theme
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install compost-jekyll-theme

## Usage

TODO: Write usage instructions here. Describe your available layouts, includes, sass and/or assets.

## Contributing

Bug reports and pull requests are welcome on 0xacab at
<https://0xacab.org/sutty/jekyll/compost-jekyll-theme>. This project is
intended to be a safe, welcoming space for collaboration, and
contributors are expected to adhere to the
[Sutty](https://sutty.nl/en/code-of-conduct/) code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme,
run `bundle exec jekyll serve` and open your browser at
`http://localhost:4000`. This starts a Jekyll server using your
theme. Add pages, documents, data, etc. like normal to test your theme's
contents. As you make modifications to your theme and to your content,
your site will regenerate and you should see the changes in the browser
after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`,
`_sass` and `assets` tracked with Git will be bundled. To add a custom
directory to your theme-gem, please edit the regexp in
`compost-jekyll-theme.gemspec` accordingly.

If you do not see the images when you compile the site you may need to 
install `git-lfs` on your [distribution](https://github.com/git-lfs/git-lfs). 

After that run it in the repository

```
git lfs install
git lfs fetch
git lfs checkout
```

## License

Copyright 2022 Cooperativa de Trabajo Sutty Ltda.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

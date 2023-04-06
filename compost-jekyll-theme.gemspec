# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'compost-jekyll-theme'
  spec.version       = '0.1.11'
  spec.authors       = ['Sutty']
  spec.email         = ['sutty@riseup.net']
  spec.summary       = 'Jekyll port for COMPOST Magazine Issue 02'
  spec.homepage      = 'https://0xacab.org/sutty/jekyll/compost-jekyll-theme'
  spec.license       = 'Apache-2.0'
  spec.files         = Dir['assets/**/*',
                           '_layouts/**/*',
                           '_includes/**/*',
                           '_sass/**/*',
                           '_data/**/*',
                           'LICENSE*',
                           'README*',
                           'CHANGELOG*']
  spec.extra_rdoc_files = Dir['README.md', 'CHANGELOG.md', 'LICENSE.txt']
  spec.rdoc_options += [
    '--title', "#{spec.name} - #{spec.summary}",
    '--main', 'README.md',
    '--line-numbers',
    '--inline-source',
    '--quiet'
  ]
  spec.metadata = {
    'bug_tracker_uri' => "#{spec.homepage}/issues",
    'homepage_uri' => spec.homepage,
    'source_code_uri' => spec.homepage,
    'changelog_uri' => "#{spec.homepage}/-/blob/master/CHANGELOG.md",
    'documentation_uri' => "https://rubydoc.info/gems/#{spec.name}"
  }

  spec.required_ruby_version = Gem::Requirement.new('>= 2.7')

  spec.add_runtime_dependency 'jekyll', '~> 4.2.0'
  spec.add_runtime_dependency 'jekyll-brotli', '~> 2.3.0'
  spec.add_runtime_dependency 'jekyll-data', '~> 1.1.0'
  spec.add_runtime_dependency 'jekyll-drafts-as-metadata', '~> 0.0.6'
  spec.add_runtime_dependency 'jekyll-embed-urls', '~> 0.5.7'
  spec.add_runtime_dependency 'jekyll-gzip', '~> 2.5.1'
  spec.add_runtime_dependency 'jekyll-hardlinks', '~> 0.2.0'
  spec.add_runtime_dependency 'jekyll-ignore-layouts', '~> 0.1.2'
  spec.add_runtime_dependency 'jekyll-images', '~> 0.4.0'
  spec.add_runtime_dependency 'jekyll-include-cache', '~> 0.2.1'
  spec.add_runtime_dependency 'jekyll-linked-posts', '~> 0.4.3'
  spec.add_runtime_dependency 'jekyll-locales', '~> 0.2.0'
  spec.add_runtime_dependency 'jekyll-order', '~> 0.1.6'
  spec.add_runtime_dependency 'jekyll-relative-urls', '~> 0.0.6'
  spec.add_runtime_dependency 'jekyll-seo-tag', '~> 2.8.0'
  spec.add_runtime_dependency 'sutty-liquid', '~> 0.11.7'

  spec.add_development_dependency 'jekyll-env', '~> 1.1.0'
  spec.add_development_dependency 'pry', '~> 0.14.2'
  spec.add_development_dependency 'rubocop-jekyll', '~> 0.12.0'
end

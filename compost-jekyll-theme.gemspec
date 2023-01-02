# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'compost-jekyll-theme'
  spec.version       = '0.1.0'
  spec.authors       = ['Sutty']
  spec.email         = ['sutty@riseup.net']
  spec.summary       = 'Jekyll port for COMPOST Magazine Issue 02'
  spec.homepage      = 'https://0xacab.org/sutty/jekyll/compost-jekyll-theme'
  spec.license       = 'Apache'
  spec.files         = Dir['assets/**/*',
                           '_layouts/**/*',
                           '_includes/**/*',
                           '_sass/**/*',
                           '_data/**/*',
                           'LICENSE*',
                           'README*']
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
  spec.add_runtime_dependency 'jekyll-brotli'
  spec.add_runtime_dependency 'jekyll-data'
  spec.add_runtime_dependency 'jekyll-drafts-as-metadata'
  spec.add_runtime_dependency 'jekyll-env'
  spec.add_runtime_dependency 'jekyll-embed-urls'
  spec.add_runtime_dependency 'jekyll-gzip'
  spec.add_runtime_dependency 'jekyll-hardlinks'
  spec.add_runtime_dependency 'jekyll-ignore-layouts'
  spec.add_runtime_dependency 'jekyll-images'
  spec.add_runtime_dependency 'jekyll-include-cache'
  spec.add_runtime_dependency 'jekyll-linked-posts'
  spec.add_runtime_dependency 'jekyll-locales'
  spec.add_runtime_dependency 'jekyll-order'
  spec.add_runtime_dependency 'jekyll-relative-urls'
  spec.add_runtime_dependency 'jekyll-seo-tag'
  spec.add_runtime_dependency 'sutty-liquid', '>= 0.11.5'

  spec.add_development_dependency 'pry'
  spec.add_development_dependency 'rubocop-jekyll'
end

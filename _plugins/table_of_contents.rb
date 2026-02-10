module Jekyll
  module TableOfContents
    def extract_toc(content)
      toc_items = []
      headings = content.scan(/<h([2-4])(?:\s+id="([^"]+)")?[^>]*>([^<]+)<\/h[2-4]>/i)
      
      headings.each do |level, id, text|
        heading_id = id.empty? ? text.downcase.gsub(/\s+/, '-').gsub(/[^\w\-]/, '') : id
        toc_items << {
          'level' => level,
          'text' => text.strip,
          'id' => heading_id
        }
      end
      
      return toc_items.to_json if toc_items.any?
      return '[]'
    end

    def add_heading_ids(content)
      content.gsub(/<h([2-4])>([^<]+)<\/h\1>/i) do |match|
        level = $1
        text = $2
        heading_id = text.downcase.gsub(/\s+/, '-').gsub(/[^\w\-]/, '')
        "<h#{level} id=\"#{heading_id}\">#{text}</h#{level}>"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TableOfContents)

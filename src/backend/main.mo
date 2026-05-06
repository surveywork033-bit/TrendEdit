import List "mo:core/List";
import TemplatesLib "lib/templates";
import TemplatesMixin "mixins/templates-api";

actor {
  let templates = List.empty<TemplatesLib.Template>();

  include TemplatesMixin(templates);
};

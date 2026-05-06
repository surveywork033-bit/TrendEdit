import List "mo:core/List";
import Types "../types/templates";
import TemplatesLib "../lib/templates";

mixin (templates : List.List<Types.Template>) {
  var nextId : Nat = 0;

  if (templates.size() == 0) {
    nextId := TemplatesLib.seed(templates, nextId);
  };

  public query func getTemplates() : async [Types.Template] {
    TemplatesLib.getAll(templates);
  };

  public query func getTemplate(id : Nat) : async ?Types.Template {
    TemplatesLib.getById(templates, id);
  };

  public func addTemplate(
    title : Text,
    preview_image : Text,
    prompt : Text,
    category : Text,
    tags : [Text]
  ) : async Types.Template {
    let t = TemplatesLib.add(templates, nextId, title, preview_image, prompt, category, tags);
    nextId += 1;
    t;
  };

  public func updateTemplate(
    id : Nat,
    title : Text,
    preview_image : Text,
    prompt : Text,
    category : Text,
    tags : [Text]
  ) : async ?Types.Template {
    TemplatesLib.update(templates, id, title, preview_image, prompt, category, tags);
  };

  public func deleteTemplate(id : Nat) : async Bool {
    TemplatesLib.remove(templates, id);
  };
};

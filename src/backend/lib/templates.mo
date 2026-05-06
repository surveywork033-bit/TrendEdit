import List "mo:core/List";
import Types "../types/templates";

module {
  public type Template = Types.Template;

  public func getAll(templates : List.List<Template>) : [Template] {
    templates.toArray();
  };

  public func getById(templates : List.List<Template>, id : Nat) : ?Template {
    templates.find(func(t) { t.id == id });
  };

  public func add(
    templates : List.List<Template>,
    nextId : Nat,
    title : Text,
    preview_image : Text,
    prompt : Text,
    category : Text,
    tags : [Text]
  ) : Template {
    let t : Template = { id = nextId; title; preview_image; prompt; category; tags };
    templates.add(t);
    t;
  };

  public func update(
    templates : List.List<Template>,
    id : Nat,
    title : Text,
    preview_image : Text,
    prompt : Text,
    category : Text,
    tags : [Text]
  ) : ?Template {
    var updated : ?Template = null;
    templates.mapInPlace(
      func(t) {
        if (t.id == id) {
          let newT : Template = { id; title; preview_image; prompt; category; tags };
          updated := ?newT;
          newT;
        } else { t };
      }
    );
    updated;
  };

  public func remove(templates : List.List<Template>, id : Nat) : Bool {
    let sizeBefore = templates.size();
    let filtered = templates.filter(func(t) { t.id != id });
    templates.clear();
    templates.append(filtered);
    templates.size() < sizeBefore;
  };

  public func seed(templates : List.List<Template>, nextId : Nat) : Nat {
    let defaults : [(Text, Text, Text, Text, [Text])] = [
      (
        "Neon Glow Portrait",
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400",
        "Transform the photo into a vibrant neon glow portrait with electric blues and purples",
        "trending",
        ["neon", "portrait", "glow"]
      ),
      (
        "Cyberpunk City",
        "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400",
        "Reimagine the scene as a futuristic cyberpunk cityscape with rain-soaked streets",
        "trending",
        ["cyberpunk", "city", "futuristic"]
      ),
      (
        "Oil Painting Classic",
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400",
        "Convert the image into a rich oil painting with classic brushwork and warm tones",
        "popular",
        ["oil", "painting", "classic"]
      ),
      (
        "Watercolor Dream",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400",
        "Transform the image into a soft watercolor painting with pastel colors and gentle washes",
        "popular",
        ["watercolor", "dream", "soft"]
      ),
      (
        "Anime Style",
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
        "Convert the photo into a detailed anime illustration with vibrant colors and sharp lines",
        "new",
        ["anime", "illustration", "japan"]
      ),
      (
        "Vintage Film",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
        "Apply a vintage film look with grain, faded colors, and retro light leaks",
        "new",
        ["vintage", "film", "retro"]
      )
    ];
    var id = nextId;
    for ((title, preview_image, prompt, category, tags) in defaults.values()) {
      templates.add({ id; title; preview_image; prompt; category; tags });
      id += 1;
    };
    id;
  };
};

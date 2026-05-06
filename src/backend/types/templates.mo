import Debug "mo:core/Debug";

module {
  public type Template = {
    id : Nat;
    title : Text;
    preview_image : Text;
    prompt : Text;
    category : Text;
    tags : [Text];
  };
};

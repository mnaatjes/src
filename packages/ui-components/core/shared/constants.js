/**
 * @file src/packages/ui-components/core/shared/constants.js
 * @memberof UIComponent
 */
/**
 * @const htmlAttributes
 * @type {Array}
 * @description
 */
export const htmlAttributes = [
    {
      attribute: "id",
      tags: ["*"], // All HTML elements
      type: "string"
    },
    {
      attribute: "class",
      tags: ["*"], // All HTML elements
      type: "string"
    },
    {
      attribute: "style",
      tags: ["*"], // All HTML elements
      type: "string"
    },
    {
      attribute: "title",
      tags: ["*"], // All HTML elements
      type: "string"
    },
    {
      attribute: "href",
      tags: ["a", "link", "area"],
      type: "string"
    },
    {
      attribute: "src",
      tags: ["img", "script", "iframe", "audio", "video", "source"],
      type: "string"
    },
    {
      attribute: "alt",
      tags: ["img", "area"],
      type: "string"
    },
    {
      attribute: "width",
      tags: ["img", "video", "canvas", "iframe", "object", "embed"],
      type: "number"
    },
    {
      attribute: "height",
      tags: ["img", "video", "canvas", "iframe", "object", "embed"],
      type: "number"
    },
    {
      attribute: "target",
      tags: ["a", "form"],
      type: "string"
    },
    {
      attribute: "rel",
      tags: ["a", "link", "area"],
      type: "string"
    },
    {
      attribute: "type",
      tags: ["button", "input", "script", "link", "source", "object", "style"],
      type: "string"
    },
    {
      attribute: "name",
      tags: ["button", "form", "fieldset", "iframe", "input", "object", "output", "select", "textarea"],
      type: "string"
    },
    {
      attribute: "value",
      tags: ["button", "input", "option", "li", "meter", "progress"],
      type: "string"
    },
    {
      attribute: "disabled",
      tags: ["button", "input", "optgroup", "option", "fieldset", "select", "textarea"],
      type: "boolean"
    },
    {
      attribute: "readonly",
      tags: ["input", "textarea"],
      type: "boolean"
    },
    {
      attribute: "required",
      tags: ["input", "select", "textarea"],
      type: "boolean"
    },
    {
      attribute: "checked",
      tags: ["input"],
      type: "boolean"
    },
    {
      attribute: "selected",
      tags: ["option"],
      type: "boolean"
    },
    {
      attribute: "maxlength",
      tags: ["input", "textarea"],
      type: "number"
    },
    {
      attribute: "min",
      tags: ["input"],
      type: "number"
    },
    {
      attribute: "max",
      tags: ["input"],
      type: "number"
    },
    {
      attribute: "step",
      tags: ["input"],
      type: "number"
    },
    {
      attribute: "placeholder",
      tags: ["input", "textarea"],
      type: "string"
    },
    {
      attribute: "autocomplete",
      tags: ["input", "form"],
      type: "string"
    },
    {
      attribute: "method",
      tags: ["form"],
      type: "string"
    },
    {
      attribute: "action",
      tags: ["form"],
      type: "string"
    },
    {
      attribute: "enctype",
      tags: ["form"],
      type: "string"
    },
    {
      attribute: "novalidate",
      tags: ["form"],
      type: "boolean"
    },
    {
      attribute: "accept",
      tags: ["input"],
      type: "string"
    },
    {
      attribute: "multiple",
      tags: ["input", "select"],
      type: "boolean"
    },
    {
      attribute: "for",
      tags: ["label"],
      type: "string"
    },
    {
      attribute: "data-*", // Data attributes (e.g., data-id, data-value)
      tags: ["*"], // All HTML elements
      type: "string" // Although the underlying type is string, it can be parsed as other types when accessed via JavaScript.
    }
];
/**
 * @const fileExtensions
 * @type {Array}
 */
export const fileExtensions = [
  ".aac", ".abap", ".abc", ".accdb", ".acdc", ".acdr", ".acdt", ".acdx", ".aclb", ".acp", ".acs", ".acsm", ".act", ".ad", ".adb", ".add", ".adf", ".adi", ".adp", ".ads", ".adt", ".aea", ".aep", ".aet", ".afm", ".agif", ".ai", ".aif", ".aifc", ".aiff", ".aim", ".ain", ".air", ".ait", ".al", ".ala", ".alf", ".align", ".all", ".als", ".amc", ".amfm", ".amr", ".ams", ".ani", ".anim", ".anx", ".ap", ".apng", ".app", ".apr", ".aps", ".apt", ".ar", ".arc", ".arch", ".arj", ".art", ".artwork", ".as", ".asc", ".ascii", ".asd", ".ase", ".asf", ".ash", ".asi", ".asm", ".aso", ".asr", ".asx", ".at", ".atc", ".atom", ".au", ".audio", ".av", ".ava", ".avi", ".avif", ".avs", ".awd", ".awg", ".axa", ".axv", ".ay", ".azv",
  ".b", ".bak", ".bat", ".bcpio", ".bdf", ".bex", ".bf", ".bib", ".bin", ".bit", ".biz", ".bk", ".blend", ".bmp", ".bmx", ".boo", ".book", ".brf", ".brk", ".bsd", ".bsp", ".bt", ".btr", ".bundle", ".bun", ".bv", ".bvh", ".bw", ".by", ".bz", ".bz2",
  ".c", ".c++", ".cab", ".caf", ".calc", ".cap", ".car", ".cb", ".cbr", ".cbt", ".cbz", ".cc", ".ccb", ".ccf", ".cd", ".cda", ".cdf", ".cdm", ".cdx", ".ceb", ".cel", ".cer", ".cf", ".cff", ".cfg", ".cgm", ".chat", ".chm", ".chml", ".ci", ".cif", ".cl", ".cla", ".class", ".clb", ".cli", ".clp", ".cls", ".cma", ".cmd", ".cml", ".cmp", ".cmx", ".cod", ".coffee", ".col", ".com", ".conf", ".config", ".contact", ".cpi", ".cpio", ".cpp", ".cpt", ".cpx", ".cr", ".crl", ".crt", ".crw", ".cs", ".csh", ".cson", ".csproj", ".css", ".csv", ".cu", ".cui", ".cur", ".cxx",
  ".d", ".dae", ".dao", ".dat", ".data", ".db", ".dbf", ".dbml", ".dbs", ".dc", ".dcl", ".dcm", ".dcr", ".dds", ".ddx", ".deb", ".def", ".der", ".desktop", ".dev", ".df", ".dft", ".dhc", ".di", ".dib", ".dic", ".diff", ".dir", ".dis", ".disco", ".disp", ".div", ".dlc", ".dll", ".dlm", ".dlog", ".doc", ".docb", ".docx", ".dot", ".dotx", ".download", ".dpj", ".dpx", ".drf", ".drw", ".dsc", ".dsl", ".dsv", ".dtd", ".dtp", ".dts", ".dv", ".dvi", ".dvr", ".dwg", ".dxf", ".dxr",
  ".e", ".e3d", ".eap", ".ear", ".eas", ".ebk", ".ecore", ".edn", ".efi", ".egl", ".eht", ".elc", ".emf", ".eml", ".emp", ".enc", ".enml", ".ent", ".eps", ".er1", ".erd", ".err", ".es", ".es3", ".esc", ".esd", ".esf", ".esi", ".esm", ".et", ".etc", ".etx", ".eva", ".evp", ".evx", ".ex", ".exb", ".exe", ".exr", ".exp", ".expressions", ".ext", ".ez",
  ".f", ".f2d", ".f3d", ".f77", ".f90", ".f95", ".fal", ".family", ".far", ".fax", ".fb2", ".fbs", ".fbt", ".fdf", ".fdr", ".fea", ".fff", ".ffp", ".flac", ".fla", ".flc", ".fli", ". फ्लो", ".flv", ".fm", ".fnt", ".fo", ".for", ".fpx", ".fr", ".frm", ".fs", ".fsp", ".fss", ".fst", ".ft", ".fth", ".ftl", ".fun", ".fwd", ".fx", ".fxml",
  ".g", ".g3d", ".gac", ".gam", ".gb", ".gbr", ".gc", ".gca", ".gcode", ".gco", ".gct", ".gcv", ".gdl", ".gds", ".gdz", ".geo", ".gex", ".gf", ".gfp", ".gg", ".ghg", ".gif", ".gl", ".glb", ".gltf", ".gm", ".gml", ".gmo", ".gmx", ".gn", ".gnc", ".gnd", ".gnu", ".go", ".gof", ".gp", ".gpx", ".gqf", ".gra", ".grb", ".grd", ".grp", ".gs", ".gsd", ".gsheet", ".gsp", ".gss", ".gst", ".gt", ".gts", ".gv", ".gvy", ".gz", ".gzip",
  ".h", ".h++", ".h3d", ".haml", ".hb", ".hbm", ".hc", ".hdr", ".hdf", ".hdml", ".heic", ".help", ".hex", ".hgl", ".hh", ".hhh", ".hlp", ".hpgl", ".hs", ".hsf", ".hsl", ".hst", ".ht", ".htaccess", ".htm", ".html", ".htx", ".hxa", ".hxc", ".hxd", ".hxk", ".hxq", ".hxr", ".hxs", ".hxt", ".hy",
  ".i", ".i3d", ".i4x", ".ib", ".iba", ".icb", ".icc", ".icns", ".icon", ".ics", ".idx", ".ief", ".iff", ".ifm", ".igf", ".ii", ".iif", ".iii", ".image", ".img", ".imp", ".ims", ".in", ".inc", ".inf", ".ing", ".ini", ".ink", ".ins", ".install", ".inx", ".io", ".ipa", ".ipd", ".ipg", ".ips", ".ipt", ".ir", ".irc", ".iri", ".irk", ".iro", ".isp", ".isu", ".it", ".itc", ".itf", ".iti", ".itp", ".its", ".iv", ".ivp", ".ivr", ".iw", ".iwi", ".ix", ".iz",
  ".j", ".java", ".jcb", ".jce", ".jcl", ".jcm", ".jcp", ".jcw", ".jda", ".jdf", ".jdl", ".jdx", ".jff", ".jfi", ".jfif", ".jif", ".jisp", ".jl", ".jls", ".jlt", ".jm", ".jng", ".jnlp", ".jnw", ".job", ".joda", ".joe", ".jpeg", ".jpg", ".jpx", ".js", ".json", ".jsp", ".jsx", ".jsw", ".jtf", ".jtt", ".ju", ".jui", ".jvm", ".jvt", ".jxr",
  ".k", ".k25", ".kar", ".kdc", ".key", ".kf", ".kfx", ".kgb", ".keychain", ".kmz", ".ko", ".kom", ".kpf", ".kth", ".ktx", ".ky",
  ".l", ".la", ".las", ".latex", ".lat", ".lb", ".lba", ".lbi", ".lbm", ".ldif", ".ldml", ".ldp", ".ldw", ".les", ".lex", ".lha", ".lhx", ".lib", ".lif", ".lisp", ".lit", ".ll", ".lng", ".lnx", ".lo", ".log", ".lot", ".lpc", ".lpd", ".lpi", ".lpt", ".lq", ".lrc", ".lrp", ".ls", ".lsm", ".lsp", ".lst", ".lsx", ".lt", ".ltd", ".lua", ".lvp", ".lvs", ".lw"
];
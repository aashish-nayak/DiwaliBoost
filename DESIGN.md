# DiwaliBoost design decisions

Audience: Indian shop owners evaluating a personal web design service on their phone.

Palette follows the explicit business brief: cream `#fcf8ef`, maroon `#742e36`, restrained saffron/gold `#87551d`, ink `#342b28`. System dark mode preserves readable contrast with warm dark surfaces and lighter maroon text.

Georgia display type reflects the heritage confectionery and festive gifting direction; Segoe UI/Arial provide fast system body text, with Nirmala UI for Hindi. No third-party font request.

Controls use 6px corners, content panels 8px, and catalogue filters pills. The hero image has an arch inspired by Jaipur architecture. Icons come from one Phosphor family. Motion is limited to a subtle entrance and button feedback, disabled for reduced motion. Dials: variance 6, motion 3, density 4.

Responsive layouts collapse below 768px. Primary buttons are at least 44px high. Cream/maroon direction explicitly supersedes the generic neutral Geist suggestion in local agent rules. Static file routing, no UI framework or animation dependency.

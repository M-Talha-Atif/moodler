🌈 Color Palette
Purpose	Color	Hex	Notes
Primary Text	Dark Charcoal	#030303	Used for titles, buttons, brand text (Moodly)
Body Text	Gray-900	#1F2937	Standard dark gray for labels and paragraphs
Subtext / Hint	Gray-500	#6B7280	Used for placeholders, hints, and muted text
Border / Outline	Gray-200	#E5E7EB	Light borders and card outlines
Input Background	White	#FFFFFF	Clean input surfaces
Screen Background	Neutral-50	#FAFAF8	Soft warm background tone
Error Background	Red-50	#FEF2F2	Light red for error boxes
Error Border	Red-300	#FCA5A5	Subtle red border accent
Error Text	Red-700	#B91C1C	Accessible red for text contrast
Accent (Success/Action)	Greenish	#7bf163 / #6bd953	Used for positive actions
Primary Button Background	Black	#030303	High-contrast, sleek CTA
Button Text	Off-white	#EFEFE7	Slightly warm white for text
________________________________________
🔠 Typography System
Use	Font	Size	Weight	Line Height	Color
App Title (Moodly)	Nunito	28px	700	36px	#030303
Section Title / Label	System / Nunito	14px	600	20px	#1F2937
Input Text	System	16px	400	24px	#111827
Button Text	System	16px	700	24px	#EFEFE7
Hint / Helper Text	System	12px	400	18px	#6B7280
Error Text	System	13px	600	20px	#B91C1C
Typography hierarchy is simple, readable, and optimized for mobile readability.
________________________________________
📐 Spacing & Layout System
Global Scale
Uses a consistent 4-point scale foundation.
Most padding/margin values are multiples of 4 or 8.
Element	Value	Description
Container Padding	16px	Default inner screen padding
Section Spacing	24px	Between major sections (e.g., inputs vs. buttons)
Label to Input Gap	6px	Small vertical gap for tight visual grouping
Between Inputs	24px	Creates balanced breathing room
Button MarginTop	8px	Light spacing before CTA
Error Box Padding	10px	Compact yet readable error space
Rounded corners are consistent:
•	Cards & Inputs: 12px
•	Buttons: 9px
•	Containers: 12px
•	RoleSelector cards: 16px (slightly higher to feel tappable)
________________________________________
🧭 Component Behavior & Micro-Interactions
•	Buttons:
o	Active state: lighter green (#6bd953)
o	Disabled state: gray (#9CA3AF)
o	Shadow: soft and minimal for elevation (shadow-sm)
•	Inputs:
o	Focus state (in future): subtle border color shift to a darker neutral.
o	Placeholder: muted gray (#9CA3AF).
•	Icons (Ionicons):
o	Eye / Eye-off icons: #6B7280, subtle and neutral.
o	Touch targets: ~40x40 for accessibility.
•	Error handling:
o	Non-intrusive red alert box with rounded corners and medium text weight.
________________________________________
📱 Component Composition Rules
•	Use Container for consistent padding + background + corner radius.
•	Use vertical stacks (gap: 24) for form sections.
•	Align all primary text to left except role pickers and titles.
•	Buttons and interactive items should fill width (w-full or flex: 1).
•	Light mode theme by default — no heavy shadows or color blocks

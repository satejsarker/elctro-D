tinymce.init({
	selector: "textarea.tinymce",
	theme: "modern",
	skin: "lightgray",
	language : 'en',
	width: "100%",
	height: 300,
	statubar: true,
	plugins: [
		"advlist anchor autolink autoresize autosave charmap code codesample colorpicker contextmenu directionality emoticons",
		"fullscreen hr insertdatetime legacyoutput link lists media nonbreaking pagebreak image imagetools paste preview tabfocus print",
		"save searchreplace table textcolor textpattern toc visualblocks visualchars wordcount"
	],
  	toolbar1: 'undo redo | insert | styleselect | bold italic removeformat | fontselect fontsizeselect blockquote | alignleft aligncenter alignright alignjustify | searchreplace',
  	toolbar2: 'paste fullscreen | preview code | forecolor backcolor | emoticons | print | nonbreaking pagebreak | restoredraft template toc | charmap | bullist numlist outdent indent | codesample insertdatetime link image media | ltr rtl',
  	insert_toolbar: 'quickimage quicktable',
  	selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
	autoresize_overflow_padding: 5,
	autosave_ask_before_unload: false,
	autosave_interval: "20s",
	autosave_restore_when_empty: true,
	autosave_retention: "20m",
  	image_advtab: true,
  	image_dimensions: true,
  	image_description: false,
  	image_title: true,
  	image_caption: true,
  	fontsize_formats: '10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 56pt 120pt, 172pt',
	image_class_list: [
		{title: 'Image Responsive', value: 'img-responsive'},
		{title: 'Image Thumbnail', value: 'img-thumbnail'},
		{title: 'Image Rounded', value: 'img-rounded'},
		{title: 'Image Circle', value: 'img-circle'},
		{title: 'None', value: ''}
	],
  	imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
  	insertdatetime_element: true,
  	link_context_toolbar: true,
  	link_assume_external_targets: true,
  	paste_data_images: true,
  	paste_enable_default_filters: false,
  	paste_webkit_styles: "all",
  	paste_as_text: true,
	formats: {
		alignleft: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
		aligncenter: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
		alignright: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
		alignjustify: {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
		bold: {inline : 'span', 'classes' : 'bold'},
		italic: {inline : 'span', 'classes' : 'italic'},
		underline: {inline : 'span', 'classes' : 'underline', exact : true},
		strikethrough: {inline : 'del'},
		forecolor: {inline : 'span', classes : 'forecolor', styles : {color : '%value'}},
		hilitecolor: {inline : 'span', classes : 'hilitecolor', styles : {backgroundColor : '%value'}},
		custom_format: {block : 'h1', attributes : {title : 'Header'}, styles : {color : 'red'}}
	},
	style_formats: [
		{title: 'Headers', items: [
		  {title: 'Header 1', format: 'h1'},
		  {title: 'Header 2', format: 'h2'},
		  {title: 'Header 3', format: 'h3'},
		  {title: 'Header 4', format: 'h4'},
		  {title: 'Header 5', format: 'h5'},
		  {title: 'Header 6', format: 'h6'}
		]},
		{title: 'Inline', items: [
		  {title: 'Bold', icon: 'bold', format: 'bold'},
		  {title: 'Italic', icon: 'italic', format: 'italic'},
		  {title: 'Underline', icon: 'underline', format: 'underline'},
		  {title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'},
		  {title: 'Superscript', icon: 'superscript', format: 'superscript'},
		  {title: 'Subscript', icon: 'subscript', format: 'subscript'},
		  {title: 'Code', icon: 'code', format: 'code'}
		]},
		{title: 'Blocks', items: [
		  {title: 'Paragraph', format: 'p'},
		  {title: 'Blockquote', format: 'blockquote'},
		  {title: 'Div', format: 'div'},
		  {title: 'Pre', format: 'pre'}
		]},
		{title: 'Alignment', items: [
		  {title: 'Left', icon: 'alignleft', format: 'alignleft'},
		  {title: 'Center', icon: 'aligncenter', format: 'aligncenter'},
		  {title: 'Right', icon: 'alignright', format: 'alignright'},
		  {title: 'Justify', icon: 'alignjustify', format: 'alignjustify'}
		]}
	]
});
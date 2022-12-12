let cropper;

dmx.Component("jonl_cropper", {
    initialData: {
        file: null
    },
    attributes: {
        src: { type: Text, default: '' },
        viewMode: { type: Number, default: 0 },
        dragMode: { type: Text, default: 'crop' },
        initialAspectRatio: { type: Number, default: NaN },
        aspectRatio: { type: Number, default: NaN },
        data: { type: Object, default: null },
        preview: { type: Text, default: '' },
        noresponsive: { type: Boolean, default: false },
        restore: { type: Boolean, default: false },
        noCheckCrossOrigin: { type: Boolean, default: false },
        noCheckOrientation: { type: Boolean, default: false },
        noModal: { type: Boolean, default: false },
        noGuides: { type: Boolean, default: false },
        noCenter: { type: Boolean, default: false },
        noHighlight: { type: Boolean, default: false },
        noBackground: { type: Boolean, default: false },
        noAutoCrop: { type: Boolean, default: false },
        autoCropArea: { type: Number, default: 0.8 },
        noMovable: { type: Boolean, default: false },
        noRotable: { type: Boolean, default: false },
        noScalable: { type: Boolean, default: false },
        noZoomable: { type: Boolean, default: false },
        noZoomOnTouch: { type: Boolean, default: false },
        noZoomOnWheel: { type: Boolean, default: false },
        wheelZoomRatio: { type: Number, default: 0.1 },
        noCropBoxMovable: { type: Boolean, default: false },
        noCropBoxResizable: { type: Boolean, default: false },
        noToggleDragModeOnDblclick: { type: Boolean, default: false },
        minContainerWidth: { type: Number, default: 200 },
        minContainerHeigth: { type: Number, default: 100 },
        minCanvasWidth: { type: Number, default: 0 },
        minCanvasHeight: { type: Number, default: 0 },
        minCropboxWidth: { type: Number, default: 0 },
        minCropboxHeight: { type: Number, default: 0 }
    },
    methods: {
        crop: function () {
            cropper.crop()
        },
        clear: function () {
            cropper.clear()
        },
        replace: function (url, hasSameSize = false) {
            cropper.replace(url, hasSameSize)
        },
        enable: function () {
            cropper.enable()
        },
        disable: function () {
            cropper.disable()
        },
        destroy: function () {
            cropper.destroy()
        },
        move: function (x, y = x) {
            cropper.move(x, y)
        },
        moveTo: function (x, y = x) {
            cropper.moveTo(x, y)
        },
        zoom: function (ratio) {
            cropper.zoom(ratio)
        },
        zoomTo: function (ratio, pivot) {
            cropper.zoomTo(ratio, pivot)
        },
        rotate: function (degree) {
            cropper.rotate(degree)
        },
        rotateTo: function (degree) {
            cropper.rotateTo(degree)
        },
        scale: function (x, y = x) {
            cropper.scale(x, y)
        },
        scaleX: function (x) {
            cropper.scaleX(x)
        },
        scaleY: function (y) {
            cropper.scaleY(y)
        },
        getData: function (rounded = false) {
            return cropper.getData(rounded)
        },
        setData: function (data) {
            cropper.setData(data)
        },
        getContainerData: function () {
            return cropper.getContainerData()
        },
        getImageData: function () {
            return cropper.getImageData()
        },
        getCanvasData: function () {
            return cropper.getCanvasData()
        },
        setCropBoxData: function (data) {
            cropper.setCropBoxData(data)
        },
        getCroppedCanvas: function (options) {
            return cropper.getCroppedCanvas(options)
        },
        setAspectRatio: function setAspectRatio(aspectRatio) {
            cropper.setAspectRatio(aspectRatio)
        },
        setDragMode: function setDragMode(mode = '') {
            cropper.setDragMode(mode)
        },
        crop: function (options, filename = 'file', type = 'image/png', encoder) {
            this.data.file = {}
            this.data.file.name = filename
            this.data.file.date = new Date().toISOString()
            this.data.file.dataUrl = cropper.getCroppedCanvas(options).toDataURL(type, encoder)
            this.data.file.size = atob(this.data.file.dataUrl.split(',')[1]).length
            this.data.file.type = this.data.file.dataUrl.substring(this.data.file.dataUrl.indexOf(":") + 1, this.data.file.dataUrl.indexOf(";"))
            this.dispatchEvent('cropped')

            // let obj = this
            // obj.data.croppedCanvas = cropper.getCroppedCanvas(options)
            // obj.data.croppedDataUrl = obj.data.croppedCanvas.toDataURL()
            // //options...filename
            // obj.data.croppedCanvas.toBlob(function (blob) {
            //     obj.data.croppedFile = new File([blob], "cropped_file.jpeg", { type: blob.type });
            //     obj.data.croppedFileURL = URL.createObjectURL(blob);
            //     obj.dispatchEvent('cropped')
            // }, 'image/jpeg', 0.8)

        },
        replaceFile: function (source, target) {
            Object.assign(target, source)
        }
    },
    events: { cropped: Event },
    update: function (oldProps, updatedProps) {
        if (/*(updatedProps && updatedProps.has('src') && oldProps.src == null) ||*/ this.props.src) {
            this.init()
        }
    },
    render: function () {
        var parent = this.$node.parentNode;
        var wrapper = document.createElement('div');
        wrapper.className = this.$node.id + "-container"
        parent.replaceChild(wrapper, this.$node);
        wrapper.appendChild(this.$node);
    },
    init: function () {
        this.$node.src = this.props.src
        this.props.src = ""
        var image = document.getElementById(this.$node.id);
        cropper = new Cropper(image, {
            container: this.$node.id + "-container",
            viewMode: this.props.viewMode,
            dragMode: this.props.dragMode,
            initialAspectRatio: this.props.initialAspectRatio,
            aspectRatio: this.props.aspectRatio,
            data: this.props.data,
            preview: this.props.preview,
            responsive: !this.props.noresponsive,
            restore: this.props.restore,
            checkCrossOrigin: !this.props.noCheckCrossOrigin,
            checkOrientation: !this.props.noCheckOrientation,
            modal: !this.props.noModal,
            guides: !this.props.noGuides,
            center: !this.props.noCenter,
            highlight: !this.props.noHighlight,
            background: !this.props.noBackground,
            autoCrop: !this.props.noAutoCrop,
            autoCropArea: this.props.autoCropArea,
            movable: !this.props.noMovable,
            rotable: !this.props.noRotable,
            scalable: !this.props.noScalable,
            zoomable: !this.props.noZoomable,
            zoomOnTouch: !this.props.noZoomOnTouch,
            zoomOnWheel: !this.props.noZoomOnWheel,
            wheelZoomRatio: this.props.wheelZoomRatio,
            cropBoxMovable: !this.props.noCropBoxMovable,
            cropBoxResizable: !this.props.noCropBoxResizable,
            toggleDragModeOnDblclick: !this.props.noToggleDragModeOnDblclick,
            minContainerWidth: this.props.minContainerWidth,
            minContainerHeigth: this.props.minContainerHeigth,
            minCanvasWidth: this.props.minCanvasWidth,
            minCanvasHeight: this.props.minCanvasHeight,
            minCropboxWidth: this.props.minCropboxWidth,
            minCropboxHeight: this.props.minCropboxHeight
        });
    }
});

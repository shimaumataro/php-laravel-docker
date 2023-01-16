<style>
    .thumbnail{
        width:100px;
        height:100px;
    }
    .hidden{
        display:none;
    }
</style>
写真1
<br>
<img class="thumbnail" src="{{ url('storage/image.jpeg') }}" id="image">
<br>
<input type="text" class="form-control hidden" value="storage/image.jpeg" name="image" type="hidden">
<br>
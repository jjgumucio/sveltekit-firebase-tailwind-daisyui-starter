<script>
  import FilePond, { registerPlugin, supported } from 'svelte-filepond';
  import FirestoreAPI from '$lib/firebase/firestore';
  import StorageAPI from '$lib/firebase/storage';

  const Firestore = new FirestoreAPI();
  const Storage = new StorageAPI();

  // Import the Image EXIF Orientation and Image Preview plugins
  // Note: These need to be installed separately
  // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
  import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

  export let server = null;

  // Register the plugins
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  // a reference to the component, used to call FilePond methods
  let pond;

  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  let name = 'filepond';

  // handle filepond events
  function handleInit() {
    console.log('FilePond has initialised');
  }

  const handleAddFile = async (err, fileItem) => {
    console.log('A file has been asdfasd', fileItem);
    try {
      const list = await Storage.listFiles();
      console.log('LIST:', list);

      return;
      const uploadRes = Storage.uploadFile(fileItem, '/test');
      console.log('UP:', uploadRes);
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  const process = () => {
    console.log('asdf');
  };
</script>

<div>
  <FilePond
    bind:this={pond}
    {name}
    {server}
    allowMultiple={true}
    oninit={handleInit}
    onaddfile={handleAddFile}
  />
</div>

<style global>
  @import 'filepond/dist/filepond.css';
  @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>

<template>
  <div class="visit">
    <div class="row">
      <Sidebar :name='patient.name' :links='links'/>
      <div id="content" class='col-10'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item" aria-current="page">
            <a :href="'/patients/envelope/' + patient_id ">Patient Envelope</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Visit Record</li>
        </ol>
        <div class="rectangle mb-25">
          <h3 class="col-12 col-md-6 m-0">{{visit.createdAt}}</h3>
        </div>
        <div class="rectangle mg-2">
          <div class="row mb-2">
              <h3 class='col-6'>Supporting Files</h3>
          </div>
          <div class='w-100 px-3'>
            <div class="row mt-2 round-border" v-for='file in files' :key='file.filename'>
              <div class="col-9"><button class='btn w-100 text-left' @click="showFile(file)">{{file.filename}}</button></div>
              <div class="col-3"><button class='btn btn-danger float-right' @click="deleteFile(file._id)">Delete</button></div>
            </div>
          </div>
          <div v-if="files.length == 0">
            No Files Yet!
          </div>
          <div class="card mt-5">
              <div class="card-body">
                <h4 class="card-title">Upload File</h4>
                  <input type="file" class='form-control-file my-auto' id="uploadForm" accept="image/*">
                  <button class='btn btn-success' @click="uploadFile"> Upload File </button> <br/>
                  <span class='text-danger' id='uploadError'></span>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Sidebar from '@/components/Sidebar.vue';
import $ from 'jquery';
import moment from 'moment';
import VisitService from '../VisitService';
import PatientService from '../PatientService';
import FileService from '../FileService';

export default {
  name: 'SupportFile',
  components: {
    Sidebar,
  },
  data: () => ({
    links: [],
    // replace this with the mongodb query result
    files: [],
    patient_id: '',
    visit_id: '',
    visit: '',
    patient: '',
  }),
  created() {
    this.patient_id = this.$route.params.id;
    this.visit_id = this.$route.params.visit_id;
    this.visit = VisitService.getVisitDetails(this.visit_id).then((visit) => {
      this.visit = visit;
      this.visit.createdAt = moment(visit.createdAt).format('LLL');
    });
    this.links.push({
      name: 'SOAP',
      dest: `/patients/visits/${this.patient_id}/${this.visit_id}`,
    });
    PatientService.fetchPatientProfile(this.patient_id).then((patient) => {
      this.patient = patient;
    });
    this.loadFiles();
  },
  methods: {
    async loadFiles() {
      FileService.getFiles(this.visit_id)
      .then((res) => {
        this.files = res.data;
      })
      .catch(() => {
        this.files = null;
      });
    },
    uploadFile() {
      const file = $('#uploadForm').prop('files')[0];
      const ext = $('#uploadForm').val().split('.').pop()
                  .toLowerCase();
      console.log(ext);
      switch (ext) {
        case 'png':
        case 'jpg':
        case 'jpeg':
          FileService.addFile(this.visit_id, file).then(() => {
            this.loadFiles();
            $('#uploadError').text('');
          });
          break;
        default:
          $('#uploadError').text('Wrong File Extension');
      }
      $('#uploadForm').val('');
    },
    async deleteFile(id) {
      await FileService.deleteFile(id);
      this.loadFiles();
    },
    showFile(data) {
      const image = new Image();
      image.src = `data:image/jpg;base64,${data.filedata.data}`;
      const w = window.open('');
      w.document.write(image.outerHTML);
    },
  },
};

</script>

<style scoped>

#content {
  padding: .25in .5in;
}

.round-border {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
}

.round-border:hover {
  background-color: lightgrey;
}

.breadcrumb {
  background: transparent;
}

.list-group-item:hover {
    background-color: lightgrey;
}

.list-group-item > button {
  border: none;
  background: transparent;
  height: 100%;
  width: 100%;
  text-align: left;
}

.add-btn {
    border: none;
    background: transparent;
    text-align: left;
}
</style>

<template>
  <div class="visit">
    <div class="row">
      <Sidebar :name='patient.name' :links='links'/>
      <div id="content" class='col-12 col-md-10'>
        <nav class="navbar navbar-expand-lg navbar-light mb-3 d-block d-md-none">
          <div class="row">
            <button class="navbar-toggler navbar-toggler-right col-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="col-10 my-auto"><strong>{{patient.name}}</strong></a>
          </div>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-md-0">
              <li class="nav-item">
                <a class="nav-link" :href="'/patients/visits/'+this.patient_id+ '/' +this.visit_id+ '/files'">Supporting Files</a>
                <a class="nav-link" href="" v-on:click="logout()">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item" aria-current="page">
            <a :href="'/patients/envelope/' + id ">Patient Envelope</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Visit Record</li>
        </ol>
        <div class="rectangle mb-25 d-md-flex">
          <h3 class="col-12 col-md-6 m-0">{{ visit_date }}</h3>
          <div class="col-12 col-md-6">
            <div class="btn btn-danger mt-3 mt-md-0 float-md-right" @click="deleteVisit">Delete Visit</div>
          </div>
        </div>
        <div class="rectangle mb-25" id='visitInfo'>
          <h3>
            Visit Basic Information
          </h3>
          <div class="mt-3">
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Weight</strong></div>
              <div class="col-12 col-md-9">{{visitInfo.weight}}</div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Heart Rate</strong></div>
              <div class="col-12 col-md-9">{{visitInfo.heart_rate}}</div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Blood Pressure</strong></div>
              <div class="col-12 col-md-9">{{visitInfo.blood_pressure}}</div>
            </div>
          </div>
          <button class='mt-3'><div class='add-btn' v-on:click='editVisit'>Edit Visit Info</div></button>
        </div>
        <!-- Edit patient form -->
        <div class="rectangle mb-25"  id="editVisitInfo">
          <h3>
            Editing Visit Information
          </h3>
          <div class="mt-3">
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Weight</strong></div>
              <div class="col-12 col-md-9"><input type="text" v-model="visitInfo.weight"/></div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Heart Rate</strong></div>
              <div class="col-12 col-md-9"><input type="text" v-model="visitInfo.heart_rate"/></div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Blood Pressure</strong></div>
              <div class="col-12 col-md-9"><input type="text" v-model="visitInfo.blood_pressure"/></div>
            </div>
            <!-- <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Name: </label>
                  <input type="text" v-model="patient.name"/>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="form-group">
                  <label for="name">Sex: </label>
                  <input type="text" v-model="patient.sex"/>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="form-group">
                  <label for="name">Age: </label>
                  <input type="text" v-model="patient.age"/>
                </div>
              </div>
            </div>
            <div class="row mt-4 mb-5">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Address: </label>
                  <input type="text" v-model="patient.address"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Occupation: </label>
                  <input type="text" v-model="patient.occupation"/>
                </div>
              </div>
            </div> -->
          </div>
          <div class="mt-3">
            <button class='btn btn-warning' @click="cancelVisit">Cancel</button>
            <button class='btn btn-success ml-3' @click="saveInfo">Save</button>
          </div>
        </div>
        <div class="rectangle mb-25">
          <h2 class='mb-25'>SOAP File</h2>
          <div class="nav dropdown d-flex d-md-none mb-3">
            <button class="btn btn-secondary dropdown-toggle"
                    type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
              Select SOAP
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
              <a class="dropdown-item" href="#subjective" data-toggle="tab">Subjective</a>
              <a class="dropdown-item" href="#objective" data-toggle="tab">Objective</a>
              <a class="dropdown-item" href="#assessment" data-toggle="tab">Assessment</a>
              <a class="dropdown-item" href="#plan" data-toggle="tab">Plan</a>
            </div>
          </div>
          <ul class="nav nav-tabs mb-25 d-none d-md-flex" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab"
              href="#subjective" role="tab" aria-controls="home" aria-selected="true">
                Subjective
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab"
              href="#objective" role="tab" aria-controls="profile" aria-selected="false">
                Objective
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab"
              href="#assessment" role="tab" aria-controls="contact" aria-selected="false">
                Assessment
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab"
              href="#plan" role="tab" aria-controls="contact" aria-selected="false">
                Plan
              </a>
            </li>
          </ul>
          <div class="tab-content" style="min-height: 70%" id="myTabContent">
            <div class="tab-pane fade show active" id="subjective" role="tabpanel" aria-labelledby="subjective-tab">
              <div class="form-group">
                <textarea class="form-control" id="formSub" rows="10" v-model="soap.subject" readonly></textarea>
              </div>
              <div class="my-3" id="editSub">
                <div class="btn btn-primary" id="editS" v-on:click="edit('Sub')">Edit Subjective</div>
              </div>
              <div class="my-3" id="editingSub">
                <div class="btn btn-warning" v-on:click="cancel('Sub')">Cancel</div>
                <div class="btn btn-success mx-2" v-on:click="save('Sub')">Save</div>
              </div>
            </div>
            <div class="tab-pane fade" id="objective" role="tabpanel" aria-labelledby="objective-tab">
              <div class="form-group">
                <textarea class="form-control" id="formObj" rows="10" v-model="soap.object" readonly></textarea>
              </div>
              <div class="my-3" id="editObj">
                <div class="btn btn-primary" v-on:click="edit('Obj')">Edit Objective</div>
              </div>
              <div class="my-3" id="editingObj">
                <div class="btn btn-warning" v-on:click="cancel('Obj')">Cancel</div>
                <div class="btn btn-success mx-2" v-on:click="save('Obj')">Save</div>
              </div>
            </div>
            <div class="tab-pane fade" id="assessment" role="tabpanel" aria-labelledby="assessment-tab">
              <div class="form-group">
                <textarea class="form-control" id="formAss" rows="10" v-model="soap.assessment" readonly></textarea>
              </div>
              <div class="my-3" id="editAss">
                <div class="btn btn-primary" v-on:click="edit('Ass')">Edit Assessment</div>
              </div>
              <div class="my-3" id="editingAss">
                <div class="btn btn-warning" v-on:click="cancel('Ass')">Cancel</div>
                <div class="btn btn-success mx-2" v-on:click="save('Ass')">Save</div>
              </div>
            </div>
            <div class="tab-pane fade" id="plan" role="tabpanel" aria-labelledby="plan-tab">
              <div class="form-group">
                <textarea class="form-control" id="formPla" rows="10" v-model="soap.plan" readonly></textarea>
              </div>
              <div class="my-3" id="editPla">
                <div class="btn btn-primary" v-on:click="edit('Pla')">Edit Plan</div>
              </div>
              <div class="my-3" id="editingPla">
                <div class="btn btn-warning" v-on:click="cancel('Pla')">Cancel</div>
                <div class="btn btn-success mx-2" v-on:click="save('Pla')">Save</div>
              </div>
            </div>
          </div>
        </div>
        <div class="rectangle mb-25">
          <div class="row mb-4">
            <h3 class="col-6 m-0">Pain Visualization Tool</h3>
            <div class="col-6 d-none d-md-block">
              <div class="btn btn-success float-right" id="saveCanvasBtn">Save</div>
            </div>
          </div>
          <div class="d-block d-md-none">
            <strong class='text-danger'>This feature is not supported on Mobile Phones.</strong>
          </div>
          <div class="d-none d-md-block">
            <div class="d-flex justify-content-center">
              <canvas id="painVisualTool" style="border:1px solid #000000;"></canvas>
            </div>
            <div class="card mt-5">
              <div class="card-body">
                <h4 class="card-title">Tool Kit</h4>
                <button id="clearCanvasBtn" class="btn btn-danger">Clear Canvas</button>
                <input type="color" id="colorPicker" name="colorPicker" value="#e32400" class="ml-0 ml-md-5 mt-3 mt-md-0">
                <label for="colorPicker">Change Brush Color</label>
              </div>
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
import moment from 'moment';
import { fabric } from 'fabric';
import image from '@/assets/human-body.jpg';
import VisitService from '../VisitService';
import PatientService from '../PatientService';

export default {
  name: 'Visit',
  components: {
    Sidebar,
  },
  data: () => ({
    // replace this with the mongodb query result
    id: '',
    visit_id: '',
    patient_id: '',
    links: [],
    soap: {
      subject: 'Subjective',
      object: 'Objective',
      assessment: 'Assessment',
      plan: 'Plan',
    },
    visitInfo: {
      weight: 'Weight',
      blood_pressure: 'BP',
      heart_rate: 'Heart Rate',
    },
    painVisual: '',
    visit_date: '-',
    patient: '',
  }),
  async created() {
    this.loadData();
    this.links.push({
      name: 'Supporting Files',
      dest: `/patients/visits/${this.id}/${this.visit_id}/files`,
    });
  },
  mounted() {
    $('#editingSub').hide();
    $('#editingObj').hide();
    $('#editingAss').hide();
    $('#editingPla').hide();
    $('#editVisitInfo').hide();
  },
  methods: {
    // Reloads data from API
    async loadData() {
      this.id = this.$route.params.id;
      this.visit_id = this.$route.params.visit_id;
      VisitService.getVisitDetails(this.visit_id).then((visit) => {
        this.visit_date = moment(visit.createdAt).format('LLL');
        this.soap = visit;
        this.patient_id = visit.patient;
        this.painVisual = visit.painVisual;
        this.visitInfo = visit;
        this.startFabric();
      });
      const data = await PatientService.fetchPatientProfile(this.id);
      this.patient = data;
    },
    editVisit() {
      $('#visitInfo').hide();
      $('#editVisitInfo').show();
    },
    cancelVisit() {
      $('#visitInfo').show();
      $('#editVisitInfo').hide();
      this.loadData();
    },
    async saveInfo() {
      console.log(this.soap);
      VisitService.updateVisit(this.visit_id, this.visitInfo)
        .then(() => {
          this.loadData();
          $('#visitInfo').show();
          $('#editVisitInfo').hide();
        });
    },
    startFabric() {
      const canvas = new fabric.Canvas('painVisualTool', {
        width: 700,
        height: 700,
        selection: false,
        border: 10,
      });
      if (this.painVisual) {
        canvas.loadFromJSON(JSON.parse(this.painVisual), canvas.renderAll.bind(canvas));
      } else {
        fabric.Image.fromURL(image, (img) => {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
          });
        });
      }
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = '#000000';
      canvas.freeDrawingBrush.width = 10;
      canvas.requestRenderAll();
      $('#clearCanvasBtn').on('click', () => {
        canvas.getObjects().forEach((o) => {
          if (o !== canvas.backgroundImage) {
            canvas.remove(o);
          }
        });
        canvas.requestRenderAll();
      });
      $('#colorPicker').on('change', (e) => {
        canvas.freeDrawingBrush.color = e.target.value;
        console.log(e.target.value);
        canvas.requestRenderAll();
      });
      $('#saveCanvasBtn').on('click', async () => {
        const dataString = JSON.stringify(canvas.toJSON());
        canvas.getObjects().forEach((o) => {
          canvas.remove(o);
        });
        VisitService.saveCanvas(this.visit_id, { painVisual: dataString })
          .then(() => {
            this.loadData().then(() => {
              this.startFabric();
            });
          });
      });
    },
    // Front-end crud
    edit(section) {
      $(`#form${section}`).prop('readonly', false);
      $(`#edit${section}`).hide();
      $(`#editing${section}`).show();
    },
    cancel(section) {
      $(`#form${section}`).prop('readonly', true);
      $(`#edit${section}`).show();
      $(`#editing${section}`).hide();
      this.loadData();
    },
    // Send to DB, also front-end change
    async save(section) {
      $(`#form${section}`).prop('readonly', true);
      $(`#edit${section}`).show();
      $(`#editing${section}`).hide();
      VisitService.updateVisit(this.visit_id, this.soap)
        .then(() => {
          this.loadData();
        });
    },
    async deleteVisit() {
      try {
        VisitService.deleteVisit(this.visit_id)
          .then(() => {
            this.$router.push(`/patients/envelope/${this.id}`);
          });
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('type');
      localStorage.removeItem('fullname');
      document.location.replace('/login');
    },
  },
};

</script>

<style scoped>
textarea {
  /* resize: none; */
  resize: vertical;
}

#content {
  padding: .25in .5in;
}

.breadcrumb {
  background: transparent;
}

.nav-link:hover {
  color: black;
}

.header {
  width: 2in;
  font-weight: bold;
}
</style>

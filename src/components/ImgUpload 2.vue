<template>
<div class="imgUpload-cont">

    <div id="image">
        <!-- File inpput accepting images -->
        <input type="file" ref="imgInput" @change="newPic" accept="image/*" >
        
        <!-- Upload image button appears when a image file is selected and hidden after the upload image button is pressed -->
        <button v-if="showBtn" @click="onUpload(), showBtn = false">Upload image</button>
        <!--<button id="remove" v-else-if="imageData != null">Remove</button>-->
    </div>
    
    <div v-if="imageData != null" id="imgAndBar">
        
    
        <!-- Upload progress bar -->
        <p>Progress: {{ uploadValue.toFixed()+"%" }}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  
        </p>
        

        <!-- Displays a preview of the uploaded image -->
        <div v-if="imageData != null" id="preview">
            <img class="preview" :src="imageUrl">
        </div>
        
    </div>
    
    
    
</div>
</template>

<script>
import firebase from 'firebase';


export default {
name: 'imgUpload',
props:["shouldReset"],
data() {
    return {
        imageData: null,
        imageUrl: null,
        uploadValue: 0,
        showBtn: false
        
    }
},

methods: {
    // State change and Preview of image after uplaod
    newPic(event) {
        this.reset()
        this.imageData = event.target.files[0];
        this.showBtn = true
        
    },
    notifyParent(val1, val2){
        this.$emit("imgUpload", [val1, val2])
    },

    //resets the image-related data
    reset(){
        
        this.imageUrl = null;
        this.imageData= null;
        this.uploadValue= 0;
    },
    // Uploads image to firebase storage
    onUpload() {
        this.imageUrl = null;
        // Storing img in firebase storage referenced by 10 random characters + filename.
        const storageRef = firebase.storage().ref(`${this.randomChars(9) + '_' + this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`, snapshot => {
            // Upload progress bar
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error => {
            console.log(error.message)},
            ()=>{this.uploadValue = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    // Set url to imageUrl which is used for adding image to firebase collection
                    this.imageUrl = url;
                    
                    
                    this.notifyParent(this.imageUrl, this.imageData);
                });
            }   
        );
    },
    
    // Generates random characters which is added to image name as reference to firebase storage as firebase storage don't accept name duplicates
    randomChars(length) {
        let result = '';
        let char = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let charLenght = char.length;
        for (let i = 0; i < length; i++) {
            result += char.charAt(Math.floor(Math.random()* charLenght));
        }
        return result;
    },
},
watch:{
    shouldReset: function(){
        this.reset()
        this.$refs.imgInput.value = ""
    },

    
    
}

}

</script>
<style scoped>
 .imgUpload-cont{
     display:flex;
     flex-direction: row;
     justify-content: space-between;
     min-height: 10em;
 }
 
 
 button {
        width: auto;
        background-color: #00509e;
        color: white;
        padding: 6px 15px;
        margin-top: 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    img.preview {
        width:100%;
    }

    #image{
        justify-content: flex-start;
        padding-top: 0.8em;
        display: flex;
        flex-direction: column;
        width:50%;


    }
    #image > button{
        max-width: 9.5em;
        margin-top: 2em;
    }
    #imgAndBar{
        width:50%;
        max-width:12em;
    }

    #progress{
        width:100%;
    }

    #remove{
        background-color: gray;
    }
</style>
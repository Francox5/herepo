//react
import { useRef, useEffect } from "react";
//three
import * as THREE from "three";
//controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//loader de gltf
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


const Template = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(5, 5, 5);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
//loader
const gltfloader = new GLTFLoader ();
//model
gltfloader.load("./models/rappi/rap.gltf", 
(gltf) =>{
  //model en scena
  scene.add(gltf.scene)

})


    //Animate the scene
    const animate = () => {
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

//luz
const luz = new THREE.AmbientLight(0xffffff, 1) ;
//add to escene
scene.add(luz);


    return () => {
      window.removeEventListener("resize", resize);
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className='Contenedor3D'
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    >


    </div>
  );
};

export default Template;


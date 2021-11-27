// code used and modified from https://interactjs.io/

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

video = document.getElementById("video");
left = document.getElementById("leftHand");
right = document.getElementById("rightHand");

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

// enable draggables to be dropped into this
interact('.dropzone').dropzone({

  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.textContent = 'Dragged in'
    video.style.opacity = "1";
    video.setAttribute("controls","controls")
    video.play()
    left.style.opacity="0.5";
    right.style.opacity="0.5";

    // for testing
    // video.style.borderRadius = "500px";


  },


  // ondragleave: function (event) {
    // remove the drop feedback style
    // event.target.classList.remove('drop-target')
    // event.relatedTarget.classList.remove('can-drop')
    // event.relatedTarget.textContent = 'Dragged out'

  // },

  // ondrop: function (event) {
  //   texts.style.height = 513;

  // },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    // event.target.classList.remove('drop-target')

  }
})

interact('.drag-drop')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
  })
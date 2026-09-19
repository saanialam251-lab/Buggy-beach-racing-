# New driving features

The app now has a larger fictional supercar garage and real touch driving input:

- Six original car designs: V12, GT3, M Performance, Track Wedge, Grand Tourer, and Hypercar.
- Shared procedural geometry factory in `src/three/CarModels.ts`.
- `stepVehicle` physics helper for throttle, braking, steering, drag, speed limits, and nitro.
- `SteeringControls` with press-and-hold left/right steering, acceleration, braking, and nitro buttons.

These are fictional designs and do not copy manufacturer meshes or logos. For realistic production assets, add only properly licensed `.glb`/`.gltf` files to the project.

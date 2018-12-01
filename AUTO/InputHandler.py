import os
import numpy as np
from pyquaternion import Quaternion
import h5py


path = "C:/Users/JörnKussmaul/PycharmProjects/autonmshck/kitti_train/hackathon/velodyne"
path_two = "C:/Users/JörnKussmaul/PycharmProjects/autonmshck/changed_data"


for filename in os.listdir(path):
        if filename.endswith(".hdf5"):
            with h5py.File(os.path.join(path, filename), 'r') as hdf5:
                print("Processing frame {}...".format(filename))

                lidar = np.array(hdf5['velodyne']).astype(np.float32).reshape(-1, 4)
                lidar_data = lidar
                gt = np.array(hdf5['bounding_boxes_3d'])
                gt2 = list(filter(lambda x: x[1] == 'Car'.encode("UTF-8"), gt))

                for g in gt2:
                    print(g[4])
                    print(Quaternion(g[4]).yaw_pitch_roll[0])


                label_data = list(map(lambda x: x[-2], gt2))



            with h5py.File(os.path.join(path_two, filename), 'w') as hdf5_out:
                hdf5_out.create_dataset("points", data=lidar_data)
                hdf5_out.create_dataset("labels", data=label_data)






import os
import numpy as np
from pyquaternion import Quaternion
import h5py

quad = Quaternion([0.4774824 ,  0.,  0.,  0.87864131])
a = quad.yaw_pitch_roll[0]
print(a)
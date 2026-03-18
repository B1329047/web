from django.db import models

class Course_table(models.Model):
    # 開課單位、課程名稱、授課老師 [cite: 1656, 1671]
    Department = models.CharField(max_length=100)
    CourseTitle = models.CharField(max_length=100)
    Instructor = models.CharField(max_length=100)

    def __str__(self):
        return self.CourseTitle
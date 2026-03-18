from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Course_table

# 1. 新增課程 API [cite: 1660, 1661]
@api_view(['GET'])
def add_course(request):
    dept = request.GET.get('Department', '')
    title = request.GET.get('CourseTitle', '')
    teacher = request.GET.get('Instructor', '')

    new_course = Course_table.objects.create(
        Department=dept,
        CourseTitle=title,
        Instructor=teacher
    )
    return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)

# 2. 列出課程 API [cite: 1658, 1659]
@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return JsonResponse(list(courses), safe=False)